import ConversationsController from './conversations.controller';
import { Router } from 'express';
import SendMessageDto from './dtos/send_message.dto';
import { Route } from '@core/interface';
import { authMiddleware } from '@core/interface/middleware';
import validationMiddleware from '@core/interface/middleware/validation.middleware';

export default class ConversationsRoute implements Route {
  public path = '/api/v1/conversations';
  public router = Router();

  public conversationController = new ConversationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Group
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(SendMessageDto, true),
      this.conversationController.sendMessage
    );

    // this.router.get(
    //   this.path,
    //   authMiddleware,
    //   this.conversationController.getMyConversation
    // );
  }
}