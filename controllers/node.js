function NodeController(state) {
  this.state = state;
}

NodeController.prototype.getNode = function(req, res) {
  res.json({
    componentType: this.state.node.componentType,
    hostname: this.state.node.hostname,
  });
}

module.exports = NodeController;
