import { FaWhatsapp } from "react-icons/fa6";
import "./FormContact.css";
import { useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";

function FormContact() {
  const handleSubmitBabkend = () => {
    console.log("Enviado");
  };
  const [state, handleSubmit] = useForm(
    import.meta.env.VITE_ID_FORM_FORMSPREE_CONTACTO
  );
  const navigation = useNavigate();
  const volverInicio = () => {
    navigation('/dash')
  }
  
  if (state.succeeded) {
    return <div className="contactoFormCheck">
      <div className="content-check">
        <p>Tu mensaje a sido enviado con exito, gracias por contactarte con Monina's</p>
        <button onClick={volverInicio}>Volver al inicio</button>
      </div>
    </div>;
  }

  return (
    <div className="container-form-contact">
      <div className="content-contact">
        <div className="label-contact">
          <p className="label-form-contact">Contactanos</p>
        </div>
        <form onSubmit={handleSubmit} className="formP">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="inputP"
            name="nombre"
            id="nombre"
            required
          />
          <ValidationError
            prefix="Nombre"
            field="nombre"
            errors={state.errors}
          />
          <input
            type="email"
            placeholder="Correo electronico"
            className="inputP"
            name="email"
            id="email"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <input
            type="text"
            placeholder="Número de telefono"
            className="inputP"
            name="telefono"
            id="telefono"
            required
          />
          <ValidationError
            prefix="Telefono"
            field="telefono"
            errors={state.errors}
          />

          <textarea
            name="mensaje"
            id="mensaje"
            placeholder="Mensaje ..."
            className="inputP"
            required
          ></textarea>
          <ValidationError
            prefix="Mensaje"
            field="mensaje"
            errors={state.errors}
          />

          <input
            type="submit"
            className="btn-submit-buy"
            value={"Enviar mensaje"}
            disabled={state.submitting}
          />
        </form>
        <div className="container-contact-whatsapp">
          <FaWhatsapp className="btn-whatsapp" />

          <a
            href="https://wa.link/ycx6zb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contactanos via Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
}

export default FormContact;
