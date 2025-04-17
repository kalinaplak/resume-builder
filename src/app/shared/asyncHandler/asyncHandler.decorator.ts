import { AsyncHandlerModule } from "./asyncHandler.module";
import { AsyncHandlerService } from "./asyncHandler.service";

export interface AsyncHandlerConfig {
  loadingProperty?: string;
  errorProperty?: string;
  errorMessage?: string;
  successMessage?: string;
}

export function AsyncHandler(config: AsyncHandlerConfig) {
  return function <T, R, A>(
    target: T,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: A[]) => Promise<R | undefined>>
  ): TypedPropertyDescriptor<(...args: A[]) => Promise<R | undefined>> {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      throw new Error(`Method ${propertyKey} is undefined.`);
    }

    descriptor.value = async function (this: T, ...args: unknown[]) {
      const asyncHandlerService = AsyncHandlerModule.injector.get<AsyncHandlerService>(AsyncHandlerService);

      const setLoadingProp = (value: boolean) => {
        if (config.loadingProperty && this && typeof this === "object") {
          (this as Record<string, unknown>)[config.loadingProperty] = value;
        }
      };

      const handleError = (error: Error) => {
        if (config.errorMessage && !config.errorProperty) {
          asyncHandlerService.handleError(error, config.errorMessage);
        }
        if (config.errorProperty && this && typeof this === "object") {
          (this as Record<string, unknown>)[config.errorProperty] = config.errorMessage;
        }
      };

      const handleSuccess = () => {
        if (config.successMessage) {
          asyncHandlerService.handleSuccess(config.successMessage);
        }
      };

      // Async handling
      setLoadingProp(true);
      try {
        const result = await originalMethod.apply(this, args as A[]);
        handleSuccess();
        return result;
      } catch (error) {
        console.error(error);
        handleError(error as Error);
      } finally {
        setLoadingProp(false);
      }
      return;
    };

    return descriptor;
  };
}