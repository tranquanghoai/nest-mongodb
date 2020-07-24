import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from 'rxjs'
import { Reflector } from "@nestjs/core";

@Injectable()
export class GlobalGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext):
        boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(roles, 'Global Guard')
        return true
    }

}