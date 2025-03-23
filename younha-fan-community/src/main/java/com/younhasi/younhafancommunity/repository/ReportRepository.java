package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}