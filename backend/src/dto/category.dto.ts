import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsString } from "class-validator";


export class CategoryDTO {

    @IsNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    category: string[];

}