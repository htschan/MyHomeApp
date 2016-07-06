function Component(moduleOrName: string | ng.IModule, selector: string, options: {
  controllerAs?: string,
  template?: string,
  templateUrl?: string,
  bindings?: { [binding: string]: string }
}) {
  return (controller: Function) => {
    var module = typeof moduleOrName === "string" ? angular.module(moduleOrName) : moduleOrName;
    module.component(selector, angular.extend(options, { controller: controller }));
  }
}