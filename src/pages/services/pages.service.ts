import { Page } from "../page.entity";
import { CreatePageDto } from "../dto/create-page.dto";

export interface PagesService {

    findPageBySlug(slug: string): Promise<Page>;

    createPage(createPageDto: CreatePageDto): Promise<Page>
}