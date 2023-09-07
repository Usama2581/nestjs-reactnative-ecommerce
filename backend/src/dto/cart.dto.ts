import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ProductsDTO } from "./products.dto";


export class CartDTO extends ProductsDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
}