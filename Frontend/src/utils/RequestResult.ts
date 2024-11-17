export class SuccessfulResult<T> {
    constructor(public readonly data: T) {
    }
}


export class LoadingResult {
}

export class ErrorResult {
    constructor(public readonly errorMessage: string) {
    }

    static Create(error: any, message: string = 'Something went wrong'): ErrorResult {
        if (error instanceof Error) {
            return new ErrorResult(error.message);
        }
        
        return new ErrorResult(message);
    }
}

export type RequestResult<T> = LoadingResult | ErrorResult | SuccessfulResult<T>;
