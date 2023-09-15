const db = require("../db/database.js");



exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE todolist';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}


exports.createTable = (req, res) => {
    let q = 'CREATE TABLE todolist1(id int AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE CREATED");
    });
}

app.use(express.json());

app.post('/tasks', (req, res) => {
    const { title, description, completed, category } = req.body;
  
    if (!title || !category) {
        return res.status(400).json({ error: 'Заголовок и категория обязательны' });
      }
      db.query(
        'INSERT INTO tasks (title, description, completed, category) VALUES (?, ?, ?, ?)',
        [title, description, completed, category],
        (err, results) => {
          if (err) {
            console.error('Ошибка при создании задачи:', err);
            return res.status(500).json({ error: 'Не удалось создать задачу' });
          }

          res.status(201).json({ message: 'Задача успешно создана', taskId: results.insertId });
    }
  );
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });


  
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        console.error('Ошибка при получении списка задач:', err);
        return res.status(500).json({ error: 'Не удалось получить список задач' });
      }
  
      
      res.status(200).json(results);
    });
  });



app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
  
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
      if (err) {
        console.error('Ошибка при получении задачи по ID:', err);
        return res.status(500).json({ error: 'Не удалось получить задачу' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Задача не найдена' });
      }
  
      
      res.status(200).json(results[0]);
    });
  });



app.put('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const { title, description, completed, category } = req.body;
  
    if (!title || !category) {
      return res.status(400).json({ error: 'Заголовок и категория обязательны' });
    }
  
    db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ?, category = ? WHERE id = ?',
      [title, description, completed, category, taskId],
      (err, results) => {
        if (err) {
          console.error('Ошибка при обновлении задачи:', err);
          return res.status(500).json({ error: 'Не удалось обновить задачу' });
        }
  
        if (results.changedRows === 0) {
          return res.status(404).json({ error: 'Задача не найдена' });
        }
  
        
        res.status(204).send();
      }
    );
  });
  

app.delete('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
  
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, results) => {
      if (err) {
        console.error('Ошибка при удалении задачи:', err);
        return res.status(500).json({ error: 'Не удалось удалить задачу' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Задача не найдена' });
      }
  
      res.status(204).send();
    });
  });
  


  app.post('/categories', (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Название категории обязательно' });
    }
  
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        console.error('Ошибка при создании категории:', err);
        return res.status(500).json({ error: 'Не удалось создать категорию' });
      }
  
      res.status(201).json({ message: 'Категория успешно создана', categoryId: results.insertId });
    });
  });



  app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        console.error('Ошибка при получении списка категорий:', err);
        return res.status(500).json({ error: 'Не удалось получить список категорий' });
      }
  
      res.status(200).json(results);
    });
  });