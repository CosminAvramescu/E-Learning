package com.example.backend.controller;

import com.example.backend.exception.NoCourseException;
import com.example.backend.exception.NoQuizException;
import com.example.backend.model.*;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.UploadedFileDto;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.mapper.QuizMapper;
import com.example.backend.mapper.UploadedFileMapper;

@RestController
@RequiredArgsConstructor
@RequestMapping("course")
public class CourseController {
    private final CourseService courseService;
    private final CategoryService categoryService;
    private final UserService userService;
    private final UserCourseService userCourseService;
    
    private final UploadedFileMapper uploadedFileMapper;
    private final QuizMapper quizMapper;

    private final CourseMapper courseMapper;

    private final EmailService emailService;

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    CourseRepository courseRepository;


    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/getAllCourses", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<List<Course>> getAllCourses() {

        List<Course> courseList = courseService.getAllCourses();

        if(courseList.size() > 0){
            return new ResponseEntity<>(courseList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/getStudentSavedCourses", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<List<Course>> getStudentSavedCourses(@RequestHeader("userId") Integer userId) {
        System.out.println(userId);

        List<Course> courseList = courseService.getCoursesByUserId(userId);

        if(courseList.size() > 0){
            return new ResponseEntity<>(courseList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @CrossOrigin(origins = {"*"})
//    @RequestMapping(value = "/getCoursesByUserId", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody
//    ResponseEntity<List<Course>> getCoursesByUserId(@RequestHeader("userId") Integer userId) {
//        System.out.println(userId);
//
//        List<Course> courseList = courseService.getCoursesByUserId(userId);
//
//        if(courseList.size() > 0){
//            return new ResponseEntity<>(courseList, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

//    @CrossOrigin(origins = {"*"})
//    @RequestMapping(value = "/getCoursesByCategory", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody
//    ResponseEntity<List<Course>> getCoursesByCategory(@RequestHeader("category") String categoryName) {
//
//        System.out.println(categoryName);
//
//        List<Course> courseList = courseService.getCoursesByCategoryName(categoryName);
//
//        if(courseList.size() > 0){
//            return new ResponseEntity<>(courseList, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }


    // TODO

    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/saveMyCourse/{userId}/{courseId}", method = RequestMethod.POST)
    public ResponseEntity<Course> saveMyCourse(@PathVariable Integer userId, @PathVariable Integer courseId) {

        UserCourse userCourse = new UserCourse();

        userCourse.setUserId(userId);
        userCourse.setCourseId(courseId);

        userCourseService.saveMyCourse(userCourse);

        if(userCourse != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }



    }

    @PostMapping("file/upload-file/{courseid}/{shared}")
    public void uploadObject(@RequestParam("files") List<MultipartFile> multipartFile, @PathVariable Integer courseid, @PathVariable String shared) throws IOException {
        if(shared.compareTo("shared")==0){
            courseService.uploadObject(multipartFile, courseid, true);
        }
        else{
            courseService.uploadObject(multipartFile, courseid, false);
        }
    }

    @GetMapping("file/download-file/{courseId}/{fileName}")
    public void downloadObject(@PathVariable Integer courseId, @PathVariable String fileName) {
        courseService.downloadObject(courseId, fileName, false);
    }

    @GetMapping("file/download-file/{courseId}/shared/{fileName}")
    public void downloadObject2(@PathVariable Integer courseId, @PathVariable String fileName) {
        courseService.downloadObject(courseId, fileName, true);
    }

    @PostMapping("add-course/{teacherId}/{categoryName}")
    public Course addCourse(@RequestBody Course course, @PathVariable Integer teacherId, @PathVariable String categoryName){
        System.out.println(course.getCourseDescription()+" "+course.getCourseName());

        User user = userService.findUserById(teacherId);
        Category category = categoryService.getCategoryByName(categoryName);

        Course newCourse = new Course();
        newCourse.setCourseName(course.getCourseName());
        newCourse.setCourseDescription(course.getCourseDescription());
        newCourse.setCategory(category);
        newCourse.setUser(user);

        courseService.addCourse(newCourse);

        userCourseService.addLink(user, newCourse);
        emailService.sendWhenACourseIsAdded(newCourse.getCourseName());
        return newCourse;

    }


    @GetMapping("{courseId}")
    public CourseDto getCourse(@PathVariable Integer courseId){
        System.out.println("cmz");
        return courseMapper.toCourseDto(courseService.getCourseById(courseId));
    }

    @GetMapping("files/{courseId}")
    public List<UploadedFileDto> getAllFiles(@PathVariable Integer courseId){
        return uploadedFileMapper.toListUploadedFileDto(courseService.getAllFiles(courseId));
    }

    @GetMapping("files/{courseId}/shared")
    public List<UploadedFileDto> getAllFiles2(@PathVariable Integer courseId){
        return uploadedFileMapper.toListUploadedFileDto(courseService.getAllFiles2(courseId));
    }

    @CrossOrigin(origins = {"*"})
    @GetMapping("quizzes/{courseId}")
    public List<Quiz> getAllQuizzes(@PathVariable Integer courseId){
        Course course = courseRepository.getCourseById(courseId);
        return quizRepository.getQuizzesByCourse(course);
//        return quizMapper.toListQuizDto(courseService.getAllQuizes(courseId));
    }


    ///asdasdasd
    //asociaza quizul la un curs
    @CrossOrigin(origins = {"*"})
    @PutMapping("quizzes/add/{courseId}/{quizzId}")
    public void addQuiz(@PathVariable Integer courseId, @PathVariable Integer quizzId) throws  NoQuizException {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizzId);
        optionalQuiz.get().setCourse(optionalCourse.get());
        if(!optionalCourse.isPresent())
            throw new NoQuizException();
        else if(!optionalQuiz.isPresent()){
            throw new NoQuizException();
        }
        else{
            //optionalQuiz.get().setCourse(optionalCourse.get());
            //quizRepository.save(optionalQuiz.get());
//            optionalCourse.get().getQuizList().add(optionalQuiz.get());

//            optionalCourse.get().incrementNoOfQuestions();
            courseRepository.save(optionalCourse.get());
        }
    }
//    @CrossOrigin(origins = {"*"})
//    @GetMapping("quizzes/{courseId}")
//    public List<Quiz> getAllQuizzesByCourse(@PathVariable Integer courseId) throws NoCourseException{
//        return courseService.getAllQuizzesByCourse(courseId);
//    }

}
