import { useMemo, useState } from 'react';
import './Home.scss';
import fieldData from './Data/Fields.json';

const FIELD_TYPES = {
  text: { name: 'Texto', icon: 'T', placeholder: 'Escribe una respuesta' },
  select: { name: 'Selección', icon: '⌄', options: ['Opción 1', 'Opción 2', 'Opción 3'] },
  radio: { name: 'Opción única', icon: '○', options: ['Opción A', 'Opción B', 'Opción C'] },
};

const createId = () => `field-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normaliseField = (item) => ({
  id: item._uid || createId(),
  type: item.type,
  label: item.label,
  required: false,
  options: item.options || FIELD_TYPES[item.type].options || [],
});

export const Home = () => {
  const [fields, setFields] = useState(() => fieldData.fields.map(normaliseField));
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fieldCount = useMemo(() => fields.length, [fields]);

  const addField = (type) => {
    const template = FIELD_TYPES[type];
    setFields((current) => [...current, {
      id: createId(), type, label: `Nuevo campo de ${template.name.toLowerCase()}`,
      required: false, options: template.options || [],
    }]);
    setSubmitted(false);
  };

  const updateField = (id, patch) => setFields((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));

  const removeField = (id) => {
    setFields((current) => current.filter((item) => item.id !== id));
    setValues((current) => { const next = { ...current }; delete next[id]; return next; });
    setSubmitted(false);
  };

  const renderControl = (item) => {
    const common = { id: `preview-${item.id}`, name: item.id, required: item.required, value: values[item.id] || '' };
    if (item.type === 'select') return <select {...common} onChange={(event) => setValues((current) => ({ ...current, [item.id]: event.target.value }))}><option value="">Selecciona una opción</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select>;
    if (item.type === 'radio') return <div className="radio-options">{item.options.map((option) => <label key={option}><input checked={values[item.id] === option} name={item.id} onChange={() => setValues((current) => ({ ...current, [item.id]: option }))} required={item.required} type="radio" value={option} />{option}</label>)}</div>;
    return <input {...common} onChange={(event) => setValues((current) => ({ ...current, [item.id]: event.target.value }))} placeholder={FIELD_TYPES.text.placeholder} type="text" />;
  };

  return (
    <main className="builder-page">
      <header className="hero"><div><span className="eyebrow">REACT FORM BUILDER</span><h1>Construye formularios sin fricción.</h1><p>Crea campos, ajusta sus etiquetas y prueba el resultado al instante.</p></div><span className="counter">{fieldCount} campos</span></header>
      <section className="builder-layout">
        <aside className="palette panel"><h2>Agregar campo</h2><p>Elige un tipo para añadirlo al formulario.</p><div className="field-types">{Object.entries(FIELD_TYPES).map(([type, item]) => <button key={type} onClick={() => addField(type)} type="button"><b>{item.icon}</b><span><strong>{item.name}</strong><small>Agregar campo</small></span><i>+</i></button>)}</div></aside>
        <section className="editor panel"><div className="panel-heading"><div><h2>Campos del formulario</h2><p>Configura el contenido y elimina solo el campo seleccionado.</p></div><span>{fieldCount}</span></div>{fields.length ? <div className="field-list">{fields.map((item, index) => <article className="field-card" key={item.id}><span className="order">{String(index + 1).padStart(2, '0')}</span><div className="field-main"><label htmlFor={`label-${item.id}`}>Etiqueta</label><input id={`label-${item.id}`} onChange={(event) => updateField(item.id, { label: event.target.value })} value={item.label} /><span className="field-type">{FIELD_TYPES[item.type].name}</span></div><label className="required"><input checked={item.required} onChange={(event) => updateField(item.id, { required: event.target.checked })} type="checkbox" />Obligatorio</label><button aria-label={`Eliminar ${item.label}`} className="delete" onClick={() => removeField(item.id)} type="button">Eliminar</button></article>)}</div> : <div className="empty-state">No hay campos. Agrega uno desde el panel izquierdo.</div>}</section>
        <section className="preview panel"><div className="panel-heading"><div><h2>Vista previa</h2><p>Así se verá para la persona que lo complete.</p></div><span className="live">EN VIVO</span></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>{fields.map((item) => <div className="preview-field" key={item.id}><div className="preview-label"><label htmlFor={`preview-${item.id}`}>{item.label}{item.required && <em>*</em>}</label><button aria-label={`Eliminar ${item.label} desde la vista previa`} className="preview-delete" onClick={() => removeField(item.id)} type="button">Eliminar</button></div>{renderControl(item)}</div>)}<button className="submit" type="submit">Enviar formulario</button>{submitted && <p className="success" role="status">Formulario enviado correctamente.</p>}</form></section>
      </section>
    </main>
  );
};
