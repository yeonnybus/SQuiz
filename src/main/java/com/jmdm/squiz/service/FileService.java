package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.Pdf;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FileService {
    @Value("${file.directory}")
    private String directory;

    public List<String> getStoredFileName(String ext){
        String uuid = UUID.randomUUID().toString();
        String storedFileName = uuid + ext;
        String filePath = Paths.get(directory, storedFileName).toString();
        System.out.println(filePath);
        List<String> list = new ArrayList<>();
        list.add(storedFileName);
        list.add(filePath);
        return list;
    }

    public void saveData(String data, String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
                writer.write(data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String loadData(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }
        return content.toString();
    }
}
