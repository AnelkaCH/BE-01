/**
 * Task Repository Interface
 *
 * Methods all task repositories must implement:
 *   getAll()           - returns array of all tasks
 *   getById(id)        - returns a single task object or null
 *   create(title)      - creates a task, returns the new task object
 *   update(id, data)   - updates a task (data: { title?, done? }), returns updated task
 *   delete(id)         - deletes a task, returns true if deleted, false if not found
 *
 * Both sqliteTaskRepository and postgresTaskRepository follow this shape.
 * Swapping between them requires changing only the require() line in server.js.
 */