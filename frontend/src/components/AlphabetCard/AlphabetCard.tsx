import { Card, Divider, Flex, Text } from "@mantine/core";

interface IAlphabetCard_Props {
  character: string;
  braille: string;

  onMouseEnter_AlphabetCard: (char: string) => void;
  onMouseLeave_AlphabetCard: () => void;
}

export default function AlphabetCard(props: IAlphabetCard_Props) {
  const character = props.character;
  const braille = props.braille;

  return (
    <Card
      key={character}
      bg="white" pb={0} pt={0} pl={0} pr={0}
      withBorder={true}
      onMouseEnter={() => { props.onMouseEnter_AlphabetCard(character); }}
      onMouseLeave={props.onMouseLeave_AlphabetCard}
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Text fw={500}>
          {character.toUpperCase()}
        </Text>
        <Divider color="black" w="100%" size="xs" />
        <Text fz="4em" lh="1em" pl="xs" pr="xs">
          {braille}
        </Text>
      </Flex>
    </Card>
  );
}
