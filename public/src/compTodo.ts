/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compTodo', {
        controllerAs: 'ct',
        template:
        `
        <md-content flex layout-padding id="content">
            <section id="todoapp" layout="column" layout-fill layout-align="top left">
                <header id="header">
                    <h1>ToDo's</h1>
                    <form id="todo-form" ng-submit="ct.addTodo()">
                        <input id="new-todo" placeholder="What needs to be done?" ng-model="ct.newTodo" autofocus>
                    </form>
                </header>
                <section id="main" ng-show="ct.totalCount" ng-cloak>
                    <input id="toggle-all" type="checkbox" ng-model="ct.allChecked" ng-click="ct.markAll(allChecked)">
                    <label for="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        <li ng-repeat="(id, todo) in ct.todos | todoFilter" ng-class="{completed: todo.completed, editing: todo == editedTodo}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ng-model="todo.completed" ng-change="todos.$save(todo)">
                                <label ng-dblclick="editTodo(todo)">{{todo.title}}</label>
                                <button class="destroy" ng-click="ct.removeTodo(todo)"></button>
                            </div>
                            <form ng-submit="ct.doneEditing(todo)">
                                <input class="edit" ng-model="todo.title" todo-escape="ct.revertEditing(todo)" todo-blur="ct.doneEditing(todo)" todo-focus="todo == editedTodo">
                            </form>
                        </li>
                    </ul>
                </section>
                <footer id="footer" ng-show="ct.totalCount" ng-cloak>
                    <span id="todo-count"><strong>{{ct.remainingCount}}</strong>
					<ng-pluralize count="ct.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
				</span>
                    <ul id="filters">
                        <li>
                            <a ng-class="{selected: location.path() == '/'} " href="#/">All</a>
                        </li>
                        <li>
                            <a ng-class="{selected: location.path() == '/active'}" href="#/active">Active</a>
                        </li>
                        <li>
                            <a ng-class="{selected: location.path() == '/completed'}" href="#/completed">Completed</a>
                        </li>
                    </ul>
                    <button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="ct.completedCount">Clear completed</button>
                </footer>
            </section>
            <div>
                <md-button ng-click="ct.toggleLeft()" class="md-primary" hide-gt-md>
                    Toggle left
                </md-button>
            </div>
            <footer id="info">
                <p>Double-click to edit a todo</p>
            </footer>
        </md-content>
        `,
        bindings: {
            auth: "="
        }
    })
    class ProductsComponent {

        static $inject: Array<string> = ['$firebaseObject', 'refService', '$firebaseArray'];
        newTodo = '';
        editedTodo = null;
        selected: Receipt = null;
        todos: AngularFireArray;

        totalCount;
        remainingCount;
        completedCount;
        allChecked = false;

        constructor(private $firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService) {
        }

        $onInit() {
            var ref = this.refService.getTodosRef();
            this.angularFireArrayService(ref).$loaded(x => {
                this.todos = x;
                var total = 0;
                var remaining = 0;
                this.todos.forEach(function (todo) {
                    // Skip invalid entries so they don't break the entire app.
                    if (!todo || !todo.$value.title) {
                        return;
                    }

                    total++;
                    if (todo.$value.completed === false) {
                        remaining++;
                    }
                });

                this.totalCount = total;
                this.remainingCount = remaining;
                this.completedCount = total - remaining;
                this.allChecked = remaining === 0;
            })
        }

        addTodo() {
            var newTodo = this.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            this.todos.$add({
                title: newTodo,
                completed: false
            });
            this.newTodo = '';
        };

        editTodo(todo) {
            this.editedTodo = todo;
            this.originalTodo = angular.extend({}, this.editedTodo);
        };

        doneEditing(todo) {
            this.editedTodo = null;
            var title = todo.title.trim();
            if (title) {
                this.todos.$save(todo);
            } else {
                this.removeTodo(todo);
            }
        };

        revertEditing(todo) {
            todo.title = this.originalTodo.title;
            this.doneEditing(todo);
        };

        removeTodo(todo) {
            this.todos.$remove(todo);
        };

        clearCompletedTodos() {
            this.todos.forEach(function (todo) {
                if (todo.$value.completed) {
                    this.removeTodo(todo);
                }
            });
        };

        markAll(allCompleted) {
            this.todos.forEach(function (todo) {
                todo.$value.completed = allCompleted;
                this.todos.$save(todo);
            });
        };
    }
}
