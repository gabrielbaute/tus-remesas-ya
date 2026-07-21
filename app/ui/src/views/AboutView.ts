import { defineComponent, computed } from "vue";

/**
 * Interfaz para la configuración de las redes sociales oficiales.
 */
export interface SocialLinks {
  whatsappChannel: string;
  instagram: string;
  tiktok: string;
}

/**
 * Vista informativa del Negocio con opciones de contacto directo y canales de redes sociales.
 */
export default defineComponent({
  name: "AboutView",
  setup() {
    // Número telefónico corporativo para soporte por WhatsApp (formato internacional sin signos)
    const whatsappPhoneNumber: string = "51900000000";
    
    // Mensaje predeterminado al iniciar la conversación por WhatsApp
    const defaultMessage: string = "¡Hola! Quisiera obtener información sobre el servicio de remesas y las tasas actuales.";

    // Enlaces de redes sociales oficiales
    const socialLinks: SocialLinks = {
      whatsappChannel: "https://whatsapp.com/channel/ejemplo",
      instagram: "https://instagram.com/tusremesasya",
      tiktok: "https://tiktok.com/@tusremesasya",
    };

    /**
     * Construye la URL estructurada para la API directa de WhatsApp.
     *
     * Returns:
     *     string: URL formateada con teléfono y mensaje codificado.
     */
    const whatsappContactUrl = computed<string>(() => {
      const encodedMessage: string = encodeURIComponent(defaultMessage);
      return `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
    });

    return {
      socialLinks,
      whatsappContactUrl,
    };
  },
});