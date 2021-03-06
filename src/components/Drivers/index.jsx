export function Drivers({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <section className="drivers">
      <h2 className="drivers__title">F1 Drivers 2022</h2>
      <table className="drivers__table">
        <thead className="drivers__header">
          <tr>
            {data[0] &&
              columns.map((heading) => (
                <th key={heading} className="drivers__table--heading">
                  {heading}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="drivers__body">
          {data.map((row) => (
            <tr key={Math.random()} className="drivers__body--row">
              {columns.map((column) => (
                <td key={Math.random()} className="drivers__body--data">
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
