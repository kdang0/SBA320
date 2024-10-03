import { useClipboard, useToast, Button} from '@chakra-ui/react';
import { CopyIcon } from "@chakra-ui/icons";
interface Joke{
    joke: string;
}

export default function Joke({joke} : Joke) {
  const { onCopy } = useClipboard(joke);
  const toast = useToast();

  const copy = () => {
    onCopy();
    toast({
      title: 'Copied!',
      status: 'success',
      duration: 800,
      isClosable: false,
      position: 'top'
    })
  }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center imageContainer">
        <h1 className="joke">{joke}</h1>
      </div>
      <Button colorScheme='yellow' className="copy" leftIcon={<CopyIcon/>} onClick={copy}>copy</Button>
    </div>
)};
