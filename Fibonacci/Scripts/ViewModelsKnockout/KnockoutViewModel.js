var viewModel = function () {
    var self = this;
    self.inputNumber = ko.observable(0);
    self.result = ko.pureComputed(function () {
        var list = FibonacciList(self.inputNumber());
        return JSON.stringify(list);
    });
};
ko.applyBindings(viewModel);