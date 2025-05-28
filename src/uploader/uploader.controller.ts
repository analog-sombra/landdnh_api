import {
  Controller,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { Response, Request } from 'express';
import { existsSync, mkdirSync } from 'fs';

interface response {
  status: boolean;
  data: unknown;
  message: string;
  function: string;
}

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('upload/:path')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destinationPath = `./public/images/${req.params.path}/`;
          if (!existsSync(destinationPath)) {
            mkdirSync(destinationPath, { recursive: true });
          }
          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${new Date().valueOf()}_${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
    @Req() req: Request,
    @Param('path') path: string,
  ): void {
    if (!path) {
      const res: any = {
        data: [],
        function: 'uploadFile',
        status: false,
        message: 'Path parameter is missing. Please provide a valid path.',
      };

      response.status(400).send(res);
      return;
    }

    if (!file) {
      const res: response = {
        data: [],
        function: 'uploadFile',
        status: false,
        message: 'Upload Failed',
      };

      response.send(res);
      response.end();
    }

    const filePath = `public/images/${path}/${file.filename}`;

    const res: response = {
      data: filePath,
      function: 'uploadFile',
      status: true,
      message: 'Upload sussfully',
    };

    response.send(res);
    response.end();
  }

  @Get()
  getAllFiles() {
    console.log('getAllFiles');
  }
}
