import { AsyncHandlerModule } from "./asyncHandler.module";
import { AsyncHandlerService } from "./asyncHandler.service";

export interface AsyncHandlerConfig {
  loadingProperty?: string;
  errorProperty?: string;
  errorMessage?: string;
  successMessage?: string;
}

export function AsyncHandler(config: AsyncHandlerConfig) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const asyncHandlerService = AsyncHandlerModule.injector.get<AsyncHandlerService>(AsyncHandlerService);

      const setLoadingProp = (value: boolean) => {
        if (config.loadingProperty) {
          (this as any)[config.loadingProperty] = value;
        }
      };
      const handleError = (error: Error) => {
        if (config.errorMessage && !config.errorProperty) {
          asyncHandlerService.handleError(error, config.errorMessage);
        }
        if (config.errorProperty) {
          (this as any)[config.errorProperty] = config.errorMessage;
        }
      };
      const handleSuccess = () => {
        if (config.successMessage) {
          asyncHandlerService.handleSuccess(config.successMessage);
        }
      };
      //async handling
      setLoadingProp(true);
      try {
        const result = await originalMethod.apply(this, args);
        handleSuccess();
        return result;
      } catch (error: any) {
        console.error(error);
        handleError(error);
      } finally {
        setLoadingProp(false);
      }
    };

    return descriptor;
  };
}
