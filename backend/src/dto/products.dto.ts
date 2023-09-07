import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductsDTO {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    discountPercentage: string;
    
    @IsNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    @IsArray()
    images: [];
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @IsString()
    @IsNotEmpty()
    title: string;

}