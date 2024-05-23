import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ActiveStatus } from "../enums/activeYn";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    /*readonly*/ username: string;

    @IsString()
    @IsOptional()
    /*readonly*/ fullname: string;

    @IsString()
    @IsOptional()
    /*readonly*/ role: string;

    @ArrayMinSize(1)
    @IsString({ each: true })
    @IsOptional()
    /*readonly*/ projects: string[];

    @IsEnum(ActiveStatus)
    @IsOptional()
    /*readonly*/ activeYn: ActiveStatus;
}
