import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users: Map<string, string> = new Map();

    create(client: any, username: string) {
        this.users.set(client.id, username);
    }

    find(client: any) {
        return this.users.get(client.id);
    }
}
