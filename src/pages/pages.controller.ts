import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Put, Logger } from "@nestjs/common";
import { PagesServiceToken } from "./constants";
import { CreatePageDto } from "./dto/create-page.dto";
import { PageDto } from "./dto/page.dto";
import { PagesService } from "./services/pages.service";

@Controller('pages')
export class PagesController {

    private readonly pagesService: PagesService;

    constructor(@Inject(PagesServiceToken) pagesService: PagesService) {
        this.pagesService = pagesService;
    }

    @Get('slug/:slug')
    async getPageBySlug(@Param('slug') slug: string): Promise<PageDto> {
        const page = await this.pagesService.findPageBySlug(slug);
        if(!page) {
            throw new NotFoundException(`Cannot find any page with slug ${slug}`);
        }
        return {
            id: page.id,
            slug: page.slug,
            title: page.title
        };
    }

    @Post()
    async createPage(@Body() createPageDto: CreatePageDto): Promise<PageDto> {
        const createdPage = await this.pagesService.createPage(createPageDto);
        return {
            id: createdPage.id,
            slug: createdPage.slug,
            title: createdPage.title
        };
    }

    @Put('slug/:slug')
    async updatePageBySlug(@Param('slug') slug: string) {
        const page = await this.pagesService.findPageBySlug(slug);
        if(!page) {
            throw new NotFoundException(`Cannot find any page with slug ${slug}`);
        }
        //TODO update page, find out about transaction
    }
}