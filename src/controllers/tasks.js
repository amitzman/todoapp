/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import express from 'express';
// import Task from '../models/task';
const router = module.exports = express.Router();
import Category from '../models/category';
import Priority from '../models/priority';
import Task from '../models/task';
import TaskView from '../viewModels/taskView';
import logger from '../config/logging';

// /tasks
router.get('/', (req, res) => {
  Task.find({}, (err, tasks) => {
    console.log('all tasks:', tasks);
    const taskViews = tasks.map(t => new TaskView(t));
    console.log('all tasksViews:', taskViews);
    res.render('tasks/index', { taskViews });
  });
});
// /tasks/new
router.get('/new', (req, res) => {
  const categories = Category.find();
  const priorities = Priority.find();
  const task = new Task();
  task.name = 'Task Name';
  task.dueDate = new Date();
  task.priority = 2;
  task.category = 'home';
  res.render('tasks/new', { task, categories, priorities });
});
// create or update task
router.post('/', (req, res) => {
  const newTask = new Task(req.body);
  console.log('Task: ', newTask);
  Task.findById(newTask._id, (err, task) => {
    console.log('FIND ID: ', newTask._id);
    if (!task) {
      console.log('SAVE');
      newTask.save(err2 => {
        if (err) {
          logger.log('error', err2.message);
        }
        res.redirect('/tasks');
      });
    } else {
      console.log('UPDATE');
      task._id = newTask._id;
      task.name = newTask.name;
      task.priority = newTask.priority;
      task.category = newTask.category;
      task.dueDate = newTask.dueDate;
      task.isComplete = newTask.isComplete;
      console.log('Task before update:', task);
      task.save(err2 => {
        if (err) {
          logger.log('error', err2.message);
        }
        res.redirect('/tasks');
      });
    }
  });
});
//  Complete button selected
router.post('/:id/complete', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (task.isComplete) {
      task.isComplete = false;
    } else {
      task.isComplete = true;
    }
    task.save(err2 => {
      if (err2) {
        logger.log('Error: ', err2.message);
      }
      res.redirect('/tasks');
    });
  });
});
//  Delete button selected
router.post('/:id/delete', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      logger.log('Error: ', err.message);
    }
    task.remove(err2 => {
      if (err2) {
        logger.log('Error: ', err2.message);
      }
      res.redirect('/tasks');
    });
  });
});
//  edit link
router.get('/:id/edit', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    console.log('task before edit:', task);
    task.save(err2 => {
      if (err2) {
        logger.log('Error: ', err2.message);
      }
      const categories = Category.find();
      const priorities = Priority.find();
      res.render('tasks/new', { task, categories, priorities });
    });
  });
});

router.post('/:id', (req, res) => {
  res.redirect('/tasks');
});
