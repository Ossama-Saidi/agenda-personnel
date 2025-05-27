// require("dotenv").config(); // Charger les variables d'environnement

const express = require("express");
const cors = require("cors");
const dbPromise = require("./db");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Agenda Personnel API",
    version: "1.0.0",
    description: "API de gestion des tâches (CRUD + filtre)",
  },
  servers: [
    {
      url: `http://localhost:5000`,
    },
  ],
  components: {
  schemas: {
    Task: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        date: { type: "string", format: "date" },
        status: {
          type: "string",
          enum: ["todo", "in-progress", "done"]
        }
      }
    }
  }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./index.js"], // fichier à scanner pour les commentaires Swagger
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

// Documentation de l'API
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Récupérer toutes les tâches
 *     description: Retourne une liste de toutes les tâches avec possibilité de filtrer par statut et date.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in-progress, done]
 *         description: Filtrer les tâches par statut
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer les tâches par date
 *     responses:
 *       200:
 *         description: Liste des tâches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

app.get("/tasks", async (req, res) => {
  const db = await dbPromise;
  const { status, date } = req.query;

  let query = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  const tasks = await db.all(query, params);
  res.json(tasks);
});
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Récupérer une tâche spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tâche trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tâche non trouvée
 */

app.get("/tasks/:id", async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  const task = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, status]
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *     responses:
 *       201:
 *         description: Tâche créée
 */

app.post("/tasks", async (req, res) => {
  const db = await dbPromise;
  const { title, date, status } = req.body;
  await db.run(
    "INSERT INTO tasks (title, date, status) VALUES (?, ?, ?)",
    [title, date, status]
  );
  res.sendStatus(201);
});
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Mettre à jour une tâche existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, status]
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *     responses:
 *       200:
 *         description: Tâche mise à jour
 *       404:
 *         description: Tâche non trouvée
 */

app.put("/tasks/:id", async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  const { title, date, status } = req.body;
  await db.run(
    "UPDATE tasks SET title = ?, date = ?, status = ? WHERE id = ?",
    [title, date, status, id]
  );
  res.sendStatus(200);
});
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tâche supprimée
 *       404:
 *         description: Tâche non trouvée
 */

app.delete("/tasks/:id", async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  await db.run("DELETE FROM tasks WHERE id = ?", [id]);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);