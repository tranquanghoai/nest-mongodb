import { Catch, Inject } from "@nestjs/common";
import { BaseExceptionFilter, HTTP_SERVER_REF } from "@nestjs/core";


@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    constructor(
        @Inject(HTTP_SERVER_REF)
    ) {
        super();
    }
}