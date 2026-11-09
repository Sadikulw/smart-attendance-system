export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`panel chart-panel ${className}`}>
      <header className="panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
