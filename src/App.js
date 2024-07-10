import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://ciano-job-bkn.onrender.com/details');
      setJobs(data);
    })();
  }, []);

  const filterJobs = (jobs, term) => {
    term = term.toLowerCase();
    return jobs.filter(job => {
      const { title, infosAdd } = job;
      const titleMatch = title.toLowerCase().includes(term);
      const infosMatch = infosAdd.some(info => {
        return (
          info.label.toLowerCase().includes(term) ||
          info.value.some(val => val.toLowerCase().includes(term))
        );
      });

      return titleMatch || infosMatch;
    });
  };

  const filteredJobs = filterJobs(jobs, search);

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="input-group my-3">
            <input
              type="text"
              onChange={event => setSearch(event.target.value)}
              className="form-control"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              aria-describedby="basic-addon1"
            />
            <button className="input-group-text" id="basic-addon1">Procurar</button>

          </div>
        </div>
      </div>

      <div className="row">
        <h1>Atualmente a plataforma contem {jobs.length}</h1>
        {filteredJobs.map((item, index) => {
          const findType = item.infosAdd.find(type => type.label === "Regime de contrato")?.value[0].trim();
          const findDescrible = item.infosAdd[6]?.value

          return (
            <div className="col-md-4 my-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text" style={{ backgroundColor: 'lightgreen', borderRadius: 20, paddingLeft: 5 }}>TIPO: {findType}</p>
                  <div>

                  </div>
                  <p className="card-text" style={{ backgroundColor: 'lightcyan', borderRadius: 20, paddingLeft: 5 }}>FORMA: {item.infosAdd[4].value}</p>
                  <p className="card-text" style={{ backgroundColor: 'lightcoral', borderRadius: 20, paddingLeft: 5 }}>SALARIO: {item.infosAdd[2].value}</p>
                  <p className="card-text">CIDADE E ESTADO: {item.infosAdd[3].value}</p>
                  <div>
                    DESCRIÇÃO:
                    {findDescrible?.map((info, i) => (
                      <p className="card-text" key={i}>{info.trim()}</p>
                    ))}
                  </div>
                  <a href="#" onClick={() => window.open(item.link)} className="btn btn-warning">Ver Vaga</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;