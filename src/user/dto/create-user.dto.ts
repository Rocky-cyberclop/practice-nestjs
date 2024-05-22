import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ActiveStatus } from "../enums/activeYn";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username;

    @IsString()
    @IsOptional()
    readonly fullname;

    @IsString()
    @IsOptional()
    readonly role;

    @IsString({ each: true })
    @IsOptional()
    readonly projects: string[];

    @IsEnum(ActiveStatus)
    @IsOptional()
    readonly activeYn;
}
