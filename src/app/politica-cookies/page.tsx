import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies — MedPhoto Colombia",
  description:
    "Información sobre el uso de cookies en el sitio web de Comercial MedPhoto S.A.S.",
};

export default function PoliticaCookies() {
  return (
    <LegalPage
      label="Privacidad"
      title="Política de Cookies"
      updatedAt="Comercial MedPhoto S.A.S — NIT 900.918.597-0 — Bogotá, Colombia"
    >
      <p>
        Comercial MedPhoto S.A.S sociedad comercial legalmente registrada en la Cámara de Comercio de
        Bogotá identificada con el NIT. No. 900.918.597-0, con domicilio en la Cl 19 No. 4 88 Of 303
        en la ciudad de Bogotá y con la dirección de correo electrónico{" "}
        <a href="mailto:contacto@medphoto.com.co">contacto@medphoto.com.co</a>, quien se denominará en
        este documento como la EMPRESA, por medio de la presente, emplea cookies en su sitio web. El
        cliente, usuario y/o todo titular de datos personales entiende que al utilizar y/o navegar en
        nuestro sitio comprende y acepta la utilización de los Cookies.
      </p>

      <h2>¿Qué son las Cookies?</h2>
      <p>
        Las Cookies son archivos creados por un sitio web con una capacidad pequeña de almacenamiento
        de datos y que se transmiten entre un emisor y un receptor de dichos datos. Las Cookies
        permiten que el receptor almacene y recupere información sobre los usuarios, en especial
        respecto de sus preferencias, veces que ha visitado la página web, tiempo de navegación en el
        sitio web, número de clics realizados, idioma de preferencia, entre otros datos que facilitan
        optimizar la experiencia del usuario y ajustarla a su comportamiento digital.
      </p>
      <p>
        La EMPRESA utiliza cookies de sesión, que caducan tras un breve periodo de tiempo o al cerrar
        el navegador, y cookies persistentes, que se mantienen almacenadas en el navegador durante un
        periodo de tiempo indefinido.
      </p>

      <h2>¿Para qué utiliza la EMPRESA las Cookies?</h2>
      <p>
        Las Cookies pueden ser utilizadas por la EMPRESA en relación con la realización de la venta de
        productos o servicios por medio de su sitio web.
      </p>
      <p>La EMPRESA utiliza los siguientes tipos de cookies:</p>
      <ul>
        <li>
          <strong>Cookies y tecnologías similares</strong> como señalizaciones web, etiquetas de píxel
          u objetos compartidos locales para prestar, evaluar y mejorar nuestros servicios de diversas
          maneras. De igual manera se emplean estas Cookies cuando el cliente o usuario visita el sitio
          web de la EMPRESA.
        </li>
        <li>
          La EMPRESA podrá compartir información obtenida a través de las cookies con personas externas
          o terceros (aliados, clientes, proveedores o empresas vinculadas a la EMPRESA), con el fin de
          mejorar los servicios al usuario.
        </li>
        <li>
          Las cookies utilizadas por la EMPRESA son necesarias para que el sitio web funcione y no se
          pueden desactivar en nuestros sistemas. Por lo general, solo se configuran en respuesta a sus
          acciones realizadas al solicitar servicios, como establecer sus preferencias de privacidad,
          iniciar sesión o completar formularios.
        </li>
      </ul>

      <h2>¿Cuáles son mis opciones de privacidad?</h2>
      <p>
        El usuario dispone de una serie de opciones para controlar o limitar el modo que la EMPRESA y
        sus colaboradores utilizan las Cookies:
      </p>
      <p>
        La mayoría de los navegadores aceptan las cookies de forma automática, pero se puede cambiar
        la configuración del navegador para rechazarlas. Si el usuario decide rechazar las cookies,
        debe tener en cuenta que es posible que no pueda iniciar sesión, personalizar o utilizar algunas
        funciones interactivas de los Servicios.
      </p>
      <ul>
        <li>
          <strong>Internet Explorer:</strong> Herramientas → Opciones de Internet → Privacidad →
          Configuración.
        </li>
        <li>
          <strong>Firefox:</strong> Herramientas → Opciones → Privacidad → Historial → Configuración
          Personalizada.
        </li>
        <li>
          <strong>Chrome:</strong> Configuración → Mostrar opciones avanzadas → Privacidad →
          Configuración de contenido.
        </li>
        <li>
          <strong>Safari:</strong> Preferencias → Seguridad.
        </li>
      </ul>
      <p>
        Las cookies de Flash funcionan de manera diferente a las cookies de navegador, por lo que es
        posible que las herramientas de gestión de cookies del navegador no las eliminen. Para obtener
        más información sobre cómo gestionar las cookies de Flash, el usuario puede consultar el panel
        Configuración de almacenamiento de sitios de Adobe.
      </p>
      <p>
        Para obtener información general sobre cómo dirigir las cookies y cómo desactivarlas, el
        usuario puede visitar{" "}
        <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
          allaboutcookies.org
        </a>.
      </p>

      <h2>Actualizaciones e Información de Contacto</h2>
      <p>
        De vez en cuando, podremos actualizar esta Política de cookies. Si lo hacemos, informaremos al
        usuario publicando la política en nuestro sitio con una nueva fecha de entrada en vigor. Si
        realizamos algún cambio sustancial, tomaremos medidas razonables para informar al usuario por
        adelantado del cambio planeado.
      </p>
      <p>
        Si tiene preguntas sobre nuestro uso de cookies, escríbanos por correo electrónico a:{" "}
        <a href="mailto:gestiondedatos@medphoto.com.co">gestiondedatos@medphoto.com.co</a>
      </p>

      <h2>Vigencia</h2>
      <p>
        La EMPRESA se reserva el derecho de modificar esta Política de Cookies en cualquier momento.
        Las modificaciones serán publicadas en esta página. Se recomienda revisarla periódicamente.
      </p>
    </LegalPage>
  );
}
