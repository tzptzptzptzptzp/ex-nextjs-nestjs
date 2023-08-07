import { NotFoundException as OrignNotFoundException } from '@nestjs/common';

export class NotFoundException extends OrignNotFoundException {
  constructor(message?: string) {
    super(message || 'Not Found');
  }
}
