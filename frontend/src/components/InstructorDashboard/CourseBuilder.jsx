import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

import {
  Container,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const CourseBuilder = () => {

  const { id } = useParams();
  const [uploading, setUploading] = useState(false);

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lectures, setLectures] = useState({});

  const [openModuleModal, setOpenModuleModal] = useState(false);
  const [openLectureModal, setOpenLectureModal] = useState(false);

  const [moduleTitle, setModuleTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchModules();
  }, []);

  // fetch course
  const fetchCourse = async () => {
    try {
      const res = await axios.get(`courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch modules
  const fetchModules = async () => {
    try {
      const res = await axios.get(`modules/course/${id}`);
      setModules(res.data.modules);

      res.data.modules.forEach((module) => {
        fetchLectures(module._id);
      });

    } catch (err) {
      console.log(err);
    }
  };

  // fetch lectures per module
  const fetchLectures = async (moduleId) => {

    try {
      const res = await axios.get(`lectures/module/${moduleId}`);
      const lectureData = res.data.lectures || res.data;
      setLectures((prev) => ({
        ...prev,
        [moduleId]: lectureData
      }));

    } catch (err) {
      console.log(err);
    }

  };

  // create module
  const handleCreateModule = async () => {
    try {

      await axios.post("modules", {
        title: moduleTitle,
        course: id
      });

      setModuleTitle("");
      setOpenModuleModal(false);

      fetchModules();

    } catch (err) {
      console.log(err);
    }
  };

  // create lecture with video
  const handleCreateLecture = async () => {

    try {
      setUploading(true);
      const formData = new FormData();

      formData.append("title", lectureTitle);
      formData.append("module", selectedModule);
      formData.append("video", videoFile);

      await axios.post("lectures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setLectureTitle("");
      setVideoFile(null);
      setOpenLectureModal(false);

      fetchLectures(selectedModule);

    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (


    <Container className="py-8">
      <Typography variant="h4" className="mb-6">
        {course?.title}
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenModuleModal(true)}
      >
        Add Module
      </Button>

      <div className="mt-6 space-y-4">

        {modules.map((module) => (

          <Accordion key={module._id}>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{module.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>

              {lectures[module._id]?.map((lecture) => (

                <Card key={lecture._id} className="mb-3">
                  <CardContent>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg">Lecture:</span>
                      <Typography variant="subtitle1" className="font-semibold">
                        {lecture.title}
                      </Typography>
                    </div>

                    <video
                      src={lecture.videoUrl}
                      controls
                      className="mt-2 w-130 h-70 rounded object-cover"
                    />

                  </CardContent>
                </Card>

              ))}

              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedModule(module._id);
                  setOpenLectureModal(true);
                }}
              >
                Add Lecture
              </Button>

            </AccordionDetails>

          </Accordion>

        ))}

      </div>

      {/* Add Module Modal */}

      <Dialog
        open={openModuleModal}
        onClose={() => setOpenModuleModal(false)}
      >

        <DialogTitle>Add Module</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Module Title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            margin="normal"
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpenModuleModal(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateModule}
          >
            Create
          </Button>

        </DialogActions>

      </Dialog>

      {/* Add Lecture Modal */}

      <Dialog
        open={openLectureModal}
        onClose={() => setOpenLectureModal(false)}
      >

        <DialogTitle>Add Lecture</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Lecture Title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            margin="normal"
          />

          <input
            type="file"
            accept="video/*"
            className="mt-4"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpenLectureModal(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateLecture}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload"
            )}
          </Button>

        </DialogActions>

      </Dialog>

    </Container>
  );
};

export default CourseBuilder;