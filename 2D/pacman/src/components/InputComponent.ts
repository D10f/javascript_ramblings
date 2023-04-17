import { PLAYER_SPEED, CELL_SIZE } from "../defs";

class InputComponent {

    private keyPressed: string;

    constructor() {
        this.keyPressed = '';
        window.addEventListener('keydown', (ev: KeyboardEvent) => {
            this.keyPressed = ev.key.toUpperCase();
        });
    }

    update(entity: any) {
        if (entity.isMoving) return;
        switch (this.keyPressed) {
            case 'A':
                entity.velocity.set(-PLAYER_SPEED, 0);
                entity.targetPosition.set(
                    entity.position.x - CELL_SIZE,
                    entity.position.y
                );
                break;
            case 'D':
                entity.velocity.set(PLAYER_SPEED, 0);
                entity.targetPosition.set(
                    entity.position.x + CELL_SIZE,
                    entity.position.y
                );
                break;
            case 'W':
                entity.velocity.set(0, -PLAYER_SPEED);
                entity.targetPosition.set(
                    entity.position.x,
                    entity.position.y - CELL_SIZE
                );
                break;
            case 'S':
                entity.velocity.set(0, PLAYER_SPEED);
                entity.targetPosition.set(
                    entity.position.x,
                    entity.position.y + CELL_SIZE
                );
                break;
            default:
                return;
        }
        entity.isMoving = true;
    }
}

export default InputComponent;
