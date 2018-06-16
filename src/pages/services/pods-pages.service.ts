import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImagesServiceToken } from "images/constants";
import { ImagesService } from "images/services/images.service";
import { Repository } from "typeorm";
import { CreatePageDto } from "../dto/create-page.dto";
import { Page } from "../page.entity";
import { PagesService } from "./pages.service";

@Injectable()
export class PodsPagesService implements PagesService {

    private readonly pageRepository: Repository<Page>;
    private readonly imagesService: ImagesService;

    constructor(@InjectRepository(Page) pageRepository: Repository<Page>,
                @Inject(ImagesServiceToken) imagesService: ImagesService) {
        this.pageRepository = pageRepository;
        this.imagesService = imagesService;
    }

    async findPageBySlug(slug: string): Promise<Page> {
        return await this.pageRepository.findOne({slug});
    }

    async createPage(createPageDto: CreatePageDto): Promise<Page> {
        if(!createPageDto.metaTitle) {
            createPageDto.metaTitle = createPageDto.title;
        }

        const newPage = await this.pageRepository.create(createPageDto);
        
        const imageId = createPageDto.imageId;
        if(imageId) {
            const image = await this.imagesService.findImageById(imageId);
            newPage.image = image;
        }
        return await this.pageRepository.save(newPage);
    }
}