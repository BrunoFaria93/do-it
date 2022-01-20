import { Center, Box, Heading, Text, Stack, Skeleton } from "@chakra-ui/react";

import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";

import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface NotFoundProps {
  isTaskDetailOpen: boolean;
  onTaskDetailClose: () => void;
  selectedTask: Task;
  taskNotFound: string;
}

export const NotFound = ({
  isTaskDetailOpen,
  onTaskDetailClose,
  selectedTask,
  taskNotFound,
}: NotFoundProps) => {
  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Center mt="40" textAlign="center" display="flex" flexDir="column">
          <Heading size="lg">Não encontramos resultados para:</Heading>
          <Text fontSize="xl" color="gray.300" fontWeight="bold">
            {taskNotFound}
          </Text>
          <Box mt="6" w={["80%", "40%"]} p="6" boxShadow="base" bg="white">
            <Stack>
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="80%"
                borderRadius="20px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="60%"
                borderRadius="20px"
              />
            </Stack>

            <Stack mt="8">
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="20px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="20px"
              />
            </Stack>
          </Box>
        </Center>
      </Box>
    </>
  );
};
