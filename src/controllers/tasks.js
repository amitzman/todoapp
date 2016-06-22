/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import express from 'express';
// import Task from '../models/task';
const router = module.exports = express.Router();
import Category from '../models/category';
import Priority from '../models/priority';
import Task from '../models/task';
import TaskView from '../viewModels/taskView';
import logger from '../config/logging';
const dateFormat = require('dateformat');
const today = dateFormat(new Date(), 'dd.mm.yyyy');

// /tasks
router.get('/', (req, res) => {
  Task.find({}, (err, tasks) => {
    const taskViews = tasks.map(t => new TaskView(t));
    res.render('tasks/index', { taskViews });
  });
});
// /tasks/new
router.get('/new', (req, res) => {
  const categories = Category.find();
  const priorities = Priority.find();
  const task = new Task();
  task.name = 'Task Name';
  console.log('Today: ', today);
  task.dueDate = today;
  task.priority = 2;
  task.category = 'home';
  res.render('tasks/new', {task, categories, priorities });
});
// create new task
router.post('/', (req, res) => {
  const task = new Task(req.body);
  console.log('Task Before Save:', task);
  task.save(err => {
    if (err) {
      logger.log('error', err.message);
    }
    res.redirect('/tasks');
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
    task.save(err2 => {
      if (err2) {
        logger.log('Error: ', err2.message);
      }
      console.log('Edit Task:',task);
      const categories = Category.find();
      const priorities = Priority.find();
      res.render('tasks/new', { task, categories, priorities } );
    });
  });
});

router.post('/:id', (req, res) => {
  res.redirect('/tasks');
});
