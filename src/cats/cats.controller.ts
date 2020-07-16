import { Controller, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {

    constructor(private catService: CatsService) { }
    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catService.create(createCatDto)
    }
}
