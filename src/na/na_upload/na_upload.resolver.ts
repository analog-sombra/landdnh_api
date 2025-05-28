import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NaUploadService } from './na_upload.service';
import { NaUpload } from './entities/na_upload.entity';
import { CreateNaUploadInput } from './dto/create-na_upload.input';
import { UpdateNaUploadInput } from './dto/update-na_upload.input';

@Resolver(() => NaUpload)
export class NaUploadResolver {
  constructor(private readonly naUploadService: NaUploadService) {}

  @Mutation(() => NaUpload)
  createNaUpload(@Args('createNaUploadInput') createNaUploadInput: CreateNaUploadInput) {
    return this.naUploadService.create(createNaUploadInput);
  }

  @Query(() => [NaUpload], { name: 'naUpload' })
  findAll() {
    return this.naUploadService.findAll();
  }

  @Query(() => NaUpload, { name: 'naUpload' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.naUploadService.findOne(id);
  }

  @Mutation(() => NaUpload)
  updateNaUpload(@Args('updateNaUploadInput') updateNaUploadInput: UpdateNaUploadInput) {
    return this.naUploadService.update(updateNaUploadInput.id, updateNaUploadInput);
  }

  @Mutation(() => NaUpload)
  removeNaUpload(@Args('id', { type: () => Int }) id: number) {
    return this.naUploadService.remove(id);
  }
}
