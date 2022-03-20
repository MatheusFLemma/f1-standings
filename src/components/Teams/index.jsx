export function Constructors({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <section className="constructors">
      <h2 className="constructors__title">F1 Constructors 2022</h2>
      <table className="constructors__table">
        <thead className="constructors__header">
          <tr>
            {data[0] &&
              columns.map((heading) => (
                <th key={heading} className="constructors__table--heading">
                  {heading}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="constructors__body">
          {data.map((row) => (
            <tr key={Math.random()}>
              {columns.map((column) => (
                <td key={Math.random()} className="constructors__body--data">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
