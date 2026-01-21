// Mock for lucide-react icons
const React = require('react')

module.exports = {
  __esModule: true,
  default: (props) => React.createElement('svg', { ...props, 'data-testid': 'lucide-icon' })
}
