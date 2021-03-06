import Layout from '../components/Layout'


const Index = () => (
  <Layout>
    <h1 className="box"><span>Barèmes IPP</span></h1>
    <div className="entry-content text">
      <h4>Prélèvements obligatoires</h4>
      <ul>
        <li><a href="./prelevements-sociaux">Prélèvements sociaux</a></li>
        <li><a href="./impot-revenu">Impôt sur le revenu</a></li>
      </ul>
      <h4>Transferts et prestations</h4>
      <ul>
        <li><a href="./prestations-sociales">Prestations sociales</a></li>
      </ul>
    </div>
  </Layout>
  )
export default Index
