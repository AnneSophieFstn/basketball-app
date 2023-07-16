import Toast from "react-native-simple-toast";

const successToast = () => {
  Toast.show(
    "L'opération a été effectuée avec succès.",
    Toast.SHORT,
    Toast.BOTTOM
  );
};

const errorToast = () => {
  Toast.show(
    "Une erreur s'est produite, veuillez réessayer...",
    Toast.SHORT,
    Toast.BOTTOM
  );
};

export { successToast, errorToast };
