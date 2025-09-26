import { SystemLogger } from "../../core/logging/logger";
import { BusinessRuleError, NotFoundError, ValidationError } from "../exceptions/domainErrors";



export abstract class BaseDomainService {
  protected readonly logger: SystemLogger
  private readonly serviceName: string;

  constructor(logger: SystemLogger) {
    this.logger = logger
    this.serviceName = this.constructor.name;
  }

  protected logOperationStart(operation: string): void {
    this.logger.auditLogger.info(`STARTING: ${operation} | SERVICE: ${this.serviceName}`);
  }

  protected logOperationSuccess(operation: string): void {
    this.logger.auditLogger.info(`COMPLETED: ${operation} | SERVICE: ${this.serviceName}`);
  }

  protected logOperationError(operation: string, error: Error): void {
    this.logger.errorLogger.error(
      `FAILED: ${operation} | SERVICE: ${this.serviceName} | ERROR: ${error.message}`,
      { stack: (error as Error).stack }
    );
  }


  protected raiseBusinessRuleError(
    operation: string,
    message: string,
    opts?: { entity?: string | null; code?: string | null }
  ): never {
    const error = new BusinessRuleError({ message, entity: opts?.entity ?? null, code: opts?.code ?? null });
    this.logOperationError(operation, error);
    throw error;
  }

  protected raiseValidationError(
    operation: string,
    message: string,
    opts?: { entity?: string | null; code?: string | null }
  ): never {
    const error = new ValidationError({ message, entity: opts?.entity ?? null, code: opts?.code ?? null });
    this.logOperationError(operation, error);
    throw error;
  }


  protected raiseNotFoundError( 
    operation: string,
    message: string,
    opts?: { entity?: string | null; code?: string | null }
  ): never {
    const error = new NotFoundError({ message, entity: opts?.entity ?? null, code: opts?.code ?? null });
    this.logOperationError(operation, error);
    throw error;
  }
}
