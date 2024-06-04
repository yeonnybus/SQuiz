package com.jmdm.squiz.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.jmdm.squiz.domain.Pdf;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String getStoredFileName(String ext){
        String uuid = UUID.randomUUID().toString();
        return uuid + ext;
    }

    public String saveData(String data, String fileName) {
        try (InputStream inputStream = new ByteArrayInputStream(data.getBytes(StandardCharsets.UTF_8))) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(data.getBytes(StandardCharsets.UTF_8).length);
            amazonS3Client.putObject(bucketName, fileName, inputStream, metadata);
        } catch (Exception e) {
            throw new RuntimeException("s3 업로드 에러", e);
        }
        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }

     private String loadData(String fileName) {
        StringBuilder content = new StringBuilder();
        try (InputStream inputStream = amazonS3Client.getObject(bucketName, fileName).getObjectContent();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error reading file from S3", e);
        }
        return content.toString();
    }

    public String loadDataFromUrl(String url) {
        String[] urlParts = parseS3Url(url);
        String bucketName = urlParts[0];
        String key = urlParts[1];
        return loadData(key);
    }

    private String[] parseS3Url(String url) {
        try {
            String bucketName = url.split("//")[1].split("\\.")[0];
            String key = url.substring(url.indexOf(".com/") + 5);
            return new String[]{bucketName, key};
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid S3 URL", e);
        }
    }
}
