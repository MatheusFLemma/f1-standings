export function LastResult({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <section className="last-result">
      <h2 className="last-result__title">F1 Last Result</h2>
      <table className="last-result__table">
        <thead className="last-result__header">
          <tr>
            {data[0] &&
              columns.map((heading) => (
                <th key={heading} className="last-result__table--heading">
                  {heading}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="last-result__body">
          {data.map((row) => (
            <tr key={Math.random()} className="last-result__body--row">
              {columns.map((column) => (
                <td key={Math.random()} className="last-result__body--data">
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
