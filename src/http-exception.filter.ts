import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from 'express'
import BaseNotification from './base.notification'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const { messageNode, message, statusCode, error } = exception.response
        let responseMessage: string
        if (statusCode && error) {
            responseMessage = message
        } else {
            responseMessage = BaseNotification[messageNode] && BaseNotification[messageNode][message] ?
                BaseNotification[messageNode][message] : 'UNKNOW_ERROR'
        }
        // console.log(exception, 'exception')
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: responseMessage
            })
    }
}