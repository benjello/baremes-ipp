/** Loads the yaml tables and sections conf and generates the routes */

const fs = require('fs')
const yaml = require('js-yaml');
const map = require('lodash.map')
const flatten = require('lodash.flatten')

const resolver = require('./resolver')

async function loadSectionFile(file) {
  const fileName = file.replace('.yaml', '')
  const textContent = fs.readFileSync(`./tables/${file}`, 'utf8')
  const yamlContent = yaml.safeLoad(textContent)
  const resolvedDesc = await resolver.resolveSection(yamlContent)
  return extractRoutes(resolvedDesc, `/${fileName}`)
}

async function loadRoutes() {
  const sectionsFiles = fs.readdirSync('./tables')
  const routes = await Promise.all(sectionsFiles.map(loadSectionFile))
  return flatten(routes)
}

function extractRoutes(desc, path) {
  if (desc.table) {
    return [{
      route: path,
      page: '/table',
      query: desc.table,
      }]
  }
  if (desc.children) {
    const sectionRoute = {
      route: path,
      page: '/section',
      query: desc
    }
    return [sectionRoute].concat(flatten(map(desc.children, (child, key) => {
      return extractRoutes(child, `${path}/${key}`)
    })))
  }
}

module.exports = {
  extractRoutes,
  loadRoutes,
}
