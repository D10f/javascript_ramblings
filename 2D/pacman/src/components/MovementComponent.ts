class MovementComponent {
    update(entity: Entity) {
        const distance = entity.position.distance(entity.targetPosition);

        if (distance > 0) {
            entity.position.add(entity.velocity);
        } else {
            entity.velocity.set(0, 0);
            entity.isMoving = false;
        }
    }
}

export default MovementComponent;
